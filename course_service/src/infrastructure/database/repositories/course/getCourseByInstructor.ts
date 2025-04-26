import { Course } from "../../models/courseModel";

export const getCourseByInstructor = async(data: {id: string, page: string, limit: string, search: string}) => {
    try {
        const pageNumber = parseInt(data.page);
        const limitNumber = parseInt(data.limit);
        
        // Create query object with instructor reference
        const query: any = { instructorRef: data.id };
        
        // Add regex search for title and description if search string exists
        if (data.search) {
            const searchRegex = new RegExp(data.search, 'i'); // 'i' for case-insensitive
            query.$or = [
                { title: { $regex: searchRegex } },
                { description: { $regex: searchRegex } }
            ];
        }

        // Execute query with pagination
        const value = await Course.find(query)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        
        // Get total count for pagination
        const total = await Course.countDocuments(query);
        
        return {
            courses: value,
            totalPages: Math.ceil(total / limitNumber).toString()
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else throw new Error("An unknown error");
    }
}