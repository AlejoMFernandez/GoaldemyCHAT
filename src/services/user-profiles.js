import { supabase } from './supabase.js';

export async function getUserProfileById(id) {
    const { data, error } = await supabase
        .from('user_profiles')
        .select()
        .eq('id', id)
        .limit(1)
        .single();

    if (error) {
        console.error('[user-profiles.js getUserProfileById] - User Nº:', id, error);
        throw new Error("error.message");
    }
    return data;
}

export async function createUserProfile(data) {
    const { error } = await supabase
        .from('user_profiles')
        .insert([data]);
    if (error) {
        console.error('[user-profiles.js createUserProfile]:', error);
        throw new Error("error.message");
    }
}

export async function updateUserProfile(id, newData) {
    const { data, error } = await supabase
        .from('user_profiles')
        .update(newData)
        .eq('id', id);

    if (error) {
        console.error('[user-profiles.js updateUserProfile] - User Nº:', id, error);
        throw new Error("error.message");
    }
}