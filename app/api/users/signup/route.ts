import supabase from '@/lib/supabase';

export async function POST(request: Request) {
    const { userName, password, gender, email } = await request.json();    
    const userData = {
        email : email,
        password : password
    }
    const { data: authData, error: authError } = await supabase.auth.signUp(userData);

    if (authError) {
        return new Response(JSON.stringify({ message: authError.message }), { status: 400 });
    }
    
    const { data, error } = await supabase.from("users").insert([{ userName, gender, email }]);
    if (error) {
        return new Response(JSON.stringify({message: 'failed to create the user'}), { status: 500 });
    }  
    return new Response(JSON.stringify({ message: 'User created successfully', authData }), { status: 201 });
}
