import { supabase } from "./supabase";

export async function saveNew(data) {
    const { error } = await supabase
        .from('news')
        .insert({
            sender_id: data.sender_id,
            title: data.title,
            body: data.body,
        });

    if (error) {
        console.error('[news.js saveNew] Error:', error);
        throw new Error(error.message);
    }
}

export async function fetchLastNews() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
        console.error('[news.js fetchLastNews] Error:', error);
        throw new Error(error.message);    
    }

    return data;
}

export function suscribeToNews(callback) {
    const chatChannel = supabase.channel('news');
      
    chatChannel.on(
        'postgres_changes',
        { 
            event: 'INSERT', 
            table: 'news',
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