import { supabase } from '../services/supabase';
import { createUserProfile, getUserProfileById, updateUserProfile } from './user-profiles';

let user = {
    id: null,
    email: null,
}
let observers = [];

loadUserCurrentAuthState();
async function loadUserCurrentAuthState() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error('[Auth.vue loadUserCurrentAuthState]:', error);
        return;
    }
    setAuthUserState({
        id: data.user.id,
        email: data.user.email,
    });

    loadExtendedProfile();
}

async function loadExtendedProfile() {
    if (user.id === null) return;
    setAuthUserState(await getUserProfileById(user.id));
}

// Funciones de manejo de usuario
export async function register(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('[Register.vue register]:', error);
            throw new Error("error.message");
        }

        setAuthUserState({
            id: data.user.id,
            email: data.user.email,
        });

        await createUserProfile({
            id: data.user.id,
            email: data.user.email,
        });

    } catch (error) {
        console.error('[Register.vue register]:', error);
        throw new Error("error.message");
    }
}

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('[Login.vue login]:', error);
        throw new Error("error.message");
    }

    setAuthUserState({
        id: data.user.id,
        email: data.user.email,
    });

    loadExtendedProfile();
}

export async function logout() {
    supabase.auth.signOut();

    setAuthUserState({
        id: null,
        email: null,
    });
}

export async function updateAuthUserData(data) {
    try {
        await updateUserProfile(user.id, data);
        setAuthUserState(data);
    } catch (error) {
        console.error('[auth.js updateAuthUserData]:', error);
        throw error;
    }
}

// Funciones de manejo de observers
export function subscribeToAuthStateChanges(callback) {
    observers.push(callback);
    notify(callback);

    return () => {
        observers = observers.filter(obs => obs !== callback);
    };
}

function notify(callback) {
    callback({...user});
}

function notifyAll() {
    observers.forEach(notify);
}

function setAuthUserState(newState){
    user = {
        ...user,
        ...newState
    };
    notifyAll();
}