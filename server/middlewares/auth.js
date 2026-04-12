import { clerkClient } from "@clerk/express";
import { debugLog } from "../utils/logger.js";

//Middleware to check userId and hasPremiumPlan

export const auth = async (req, res, next)=>{
    debugLog("AUTH", "Middleware triggered", { path: req.path });
    try{
        const {userId, has} = await req.auth();
        debugLog("AUTH", "Auth object resolved", { userId });
        // Check for common premium plan names
        const isStandardPremium = await has({ plan: 'premium' });
        const isPremiumPro = await has({ plan: 'premium_pro' });
        
        const hasPremiumPlan = isStandardPremium || isPremiumPro;

        const user = await clerkClient.users.getUser(userId);
        console.log(`>>> User ${userId} | Premium: ${hasPremiumPlan} | Free Usage: ${user.privateMetadata.free_usage || 0}`);

        if(!hasPremiumPlan && user.privateMetadata.free_usage){
            req.free_usage = user.privateMetadata.free_usage
        } else {
            // Reset free usage if they are premium or have no usage record
            if (hasPremiumPlan) {
                await clerkClient.users.updateUserMetadata(userId, {
                    privateMetadata: { free_usage: 0 }
                });
            }
            req.free_usage = user.privateMetadata.free_usage || 0;
        }

        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next()
    } catch (error) {
        debugLog("AUTH", "Error in middleware", { error: error.message });
        res.json({ success: false, message: error.message })
    }
}