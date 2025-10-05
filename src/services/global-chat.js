import { supabase } from "./supabase";

export async function saveGlobalChatMessage(data) {
    const { error } = await supabase
        .from('global_chat_messages')
        .insert({
            sender_id: data.sender_id,
            email: data.email,
            content: data.content,
        });

    if (error) {
        console.error('[globa-chat.js saveGlobalChatMessage] Error:', error);
        throw new Error(error.message);
    }
}

export async function fetchLastGlobalChatMessages() {
    const { data, error } = await supabase
      .from('global_chat_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
        console.error('[globa-chat.js fetchLastGlobalChatMessages] Error:', error);
        throw new Error(error.message);    
    }

    return data;
}

export function suscribeToGlobalChatMessages(callback) {
    const chatChannel = supabase.channel('global_chat_messages');
      
    chatChannel.on(
        'postgres_changes',
        { 
            event: 'INSERT', 
            table: 'global_chat_messages',
            schema: 'public', 
        },
        payload => {
            callback(payload.new);
        }
    );
      
    chatChannel.subscribe();

    return () => {
        chatChannel.unsubscribe();
    };
}