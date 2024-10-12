import redisClient from "./redisClient";
import { Recipe, WeeklyScheduleRows } from "@/src/types/period";

const APPLICATION_KEY="PI_SCHEDULE_APP";

const ACTIVE_PERIOD_KEY = "ACTIVE_PERIOD";
const ACTIVE_SCHEDULE_KEY = "ACTIVE_SCHEDULE";

const RECIPES = "RECIPES";

const redisConnection = redisClient.connect();


export const setActivePeriod = async (period: string) => {
    const connection = await redisConnection;

    return await connection.hSet(APPLICATION_KEY, ACTIVE_PERIOD_KEY, period);
}

export const getActivePeriod = async () => {
    const connection = await redisConnection;

    const period = await connection.hGet(APPLICATION_KEY, ACTIVE_PERIOD_KEY);

    if(!period) return null;

    return new Date(period);
}

export const setActiveSchedule = async (schedule: WeeklyScheduleRows) => {
    const connection = await redisConnection;

    return await connection.hSet(APPLICATION_KEY, ACTIVE_SCHEDULE_KEY, JSON.stringify(schedule));
}

export const getActiveSchedule = async (): Promise<WeeklyScheduleRows | null> => {
    const connection = await redisConnection;

    const schedule = await connection.hGet(APPLICATION_KEY, ACTIVE_SCHEDULE_KEY);

    if(!schedule) return null;

    return JSON.parse(schedule);
}

export const storeNewRecipe = async (recipe: Recipe) => {
    const connection = await redisConnection;
    return await connection.json.arrAppend(APPLICATION_KEY, RECIPES, JSON.stringify(recipe));
}

export const getRecipes = async () => {
    const connection = await redisConnection;
    const recipes = await connection.json.get(APPLICATION_KEY);
    console.log(recipes);
    return recipes;
}