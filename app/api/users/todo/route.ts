import { NextResponse, NextRequest } from "next/server";
import supabase from "@/lib/supabase";

interface TasksData {
    userId: string;
    task: string | string[]; // Can be a single string or an array of strings
}

export async function POST(request: NextRequest) {
    try {
        // Parse the request body as JSON
        const { userId, task }: TasksData = await request.json();

        if (!userId || !task) {
            return NextResponse.json({ error: "Data is not complete." }, { status: 400 });
        }

        // Fetch the current tasks array for the user
        const { data, error: fetchError } = await supabase
            .from('users')
            .select('tasks')
            .eq('id', userId)
            .single();

        if (fetchError) {
            return NextResponse.json({ error: "Error fetching user tasks." }, { status: 500 });
        }

        // Determine if the task is a single item or an array, and update the tasks array accordingly
        const tasksToAdd = Array.isArray(task) ? task : [task];
        const updatedTasks = data.tasks ? [...data.tasks, ...tasksToAdd] : tasksToAdd;

        // Update the tasks array in the database
        const { error: updateError } = await supabase
            .from('users')
            .update({ tasks: updatedTasks })
            .eq('id', userId);

        if (updateError) {
            return NextResponse.json({ error: "Error updating tasks." }, { status: 500 });
        }

        return NextResponse.json({ message: "Task(s) added successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error adding task:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
