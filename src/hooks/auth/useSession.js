// src/hooks/auth/useSession.js
import { useEffect, useState } from "react";
import { supabase } from "@/service/supabase";

export function useSession() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSession() {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        }

        loadSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return { session, loading };
}
