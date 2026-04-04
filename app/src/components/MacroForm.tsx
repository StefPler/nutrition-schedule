"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Select } from "@radix-ui/themes";
import { ActivityLevel, UserProfile, WeightLossRate } from "../types/userProfile";
import { useUserProfileStorage } from "../hooks/useStorage";
import { useEffect, useMemo } from "react";

type FormWeightLossRate = "Maintain" | "Conservative" | "Moderate" | "Aggressive";

type FormActivityLevel = "Sedentary" | "LightlyActive" | "ModeratelyActive" | "VeryActive";

const FormSchema = z.object({
  weight: z
    .number({ coerce: true, invalid_type_error: "Input should be a number" })
    .gt(0, {
      message: "Το βάρος πρέπει να είναι μεγαλύτερο του 0",
    })
    .lt(500, { message: "Το βάρος πρέπει να είναι μικρότερο του 500" }),
  height: z
    .number({ coerce: true, invalid_type_error: "Input should be a number" })
    .gt(0, {
      message: "Το ύψος πρέπει να είναι μεγαλύτερο του 0",
    })
    .lt(250, { message: "Το ύψος πρέπει να είναι μικρότερο του 250" }),
  age: z
    .number({ coerce: true, invalid_type_error: "Input should be a number" })
    .int()
    .gt(0, {
      message: "Η ηλικία πρέπει να είναι μεγαλύτερη του 0",
    })
    .lt(100, { message: "Η ηλικία πρέπει να είναι μικρότερη απο 100" }),
  gender: z.enum(["male", "female"], {
    required_error: "Can not be empty",
    message: "Invalid gender",
  }),
  weightLossRate: z.enum(["Maintain", "Conservative", "Moderate", "Aggressive"], {
    required_error: "Can not be empty",
    message: "Invalid weight loss target",
  }),
  activityLevel: z.enum(["Sedentary", "LightlyActive", "ModeratelyActive", "VeryActive"], {
    required_error: "Can not be empty",
    message: "Invalid activity level target",
  }),
});

const parseFormToUserProfile = (data: z.infer<typeof FormSchema>): UserProfile => {
  return {
    weight: data.weight,
    height: data.height,
    age: data.age,
    gender: data.gender,
    weightLossRate: WeightLossRate[data.weightLossRate as keyof typeof WeightLossRate],
    activityLevel: ActivityLevel[data.activityLevel as keyof typeof ActivityLevel],
  };
};

const parseUserProfileToForm = (userProfile: UserProfile | undefined): z.infer<typeof FormSchema> | undefined => {
  if (!userProfile) return undefined;

  return {
    weight: userProfile.weight,
    height: userProfile.height,
    age: userProfile.age,
    gender: userProfile.gender,
    weightLossRate: WeightLossRate[userProfile.weightLossRate] as FormWeightLossRate,
    activityLevel: ActivityLevel[userProfile.activityLevel] as FormActivityLevel,
  };
};

export const MacroForm = ({ updateCallback }: { updateCallback: () => void }) => {
  const { getItem: getUserProfile, setItem: setUserProfile } = useUserProfileStorage();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    // defaultValues: parseUserProfileToForm(userProfile),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Submitting:", data);
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    setUserProfile.mutate(parseFormToUserProfile(data));
    updateCallback();
    toast.success("Το προφίλ ενημερώθηκε επιτυχώς!");
  };

  useEffect(() => {
    if (getUserProfile.data) {
      let defaultValues = parseUserProfileToForm(getUserProfile.data);
      let parsed = FormSchema.parse(defaultValues);
      console.log("Parsed values:", parsed);
      form.reset(parsed);
    }
  }, [getUserProfile.data]);

  const watchedValues = form.watch(["weight", "height", "age", "gender", "activityLevel", "weightLossRate"]);
  const estimatedWeeklyLoss = useMemo(() => {
    const [weight, height, age, gender, activityLevelKey, weightLossRateKey] = watchedValues;
    if (!weight || !height || !age || !gender || !activityLevelKey || !weightLossRateKey) return null;

    const activityLevel = ActivityLevel[activityLevelKey as keyof typeof ActivityLevel];
    const rate = WeightLossRate[weightLossRateKey as keyof typeof WeightLossRate];
    if (!rate) return null;

    const bmr =
      gender === "male" ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = bmr * activityLevel;
    const dailyDeficit = tdee * rate;
    // 7700 kcal ≈ 1 kg of fat
    return ((dailyDeficit * 7) / 7700).toFixed(2);
  }, [watchedValues]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Βάρος</FormLabel>
                <FormControl>
                  <Input placeholder="π.χ: 85" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>Μονάδα μέτρησης είναι τα kg.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ύψος</FormLabel>
                <FormControl>
                  <Input placeholder="π.χ: 180" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>Μονάδα μέτρησης είναι τα cm.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ηλικία</FormLabel>
                <FormControl>
                  <Input placeholder="π.χ: 24" {...field} value={field.value ?? ""} />
                </FormControl>
                {/* <FormDescription>This is how old you are.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Φύλο</FormLabel>
                <FormControl>
                  <Select.Root value={field.value} onValueChange={(value) => value && field.onChange(value)}>
                    <Select.Trigger className="flex h-10 rounded-md" placeholder="π.χ: Αρσενικό" />
                    <Select.Content position="popper">
                      <Select.Item value="male">Αρσενικό</Select.Item>
                      <Select.Item value="female">Θηλυκό</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </FormControl>
                {/* <FormDescription>This is your gender.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Άσκηση</FormLabel>
                <FormControl>
                  <Select.Root value={field.value} onValueChange={(value) => value && field.onChange(value)}>
                    <Select.Trigger className="flex h-10 rounded-md" placeholder="π.χ: Ελαφριά Άσκηση" />
                    <Select.Content position="popper">
                      <Select.Item value="Sedentary">Καθηστική Ζωή</Select.Item>
                      <Select.Item value="LightlyActive">Ελαφριά Άσκηση (1-3 φορές την εβδομάδα)</Select.Item>
                      <Select.Item value="ModeratelyActive">Μέτρια Άσκηση (3-5 φορές την εβδομάδα)</Select.Item>
                      <Select.Item value="VeryActive">Έντονη Άσκηση (καθημερινά)</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </FormControl>
                <FormDescription>Πόσο συχνά κάνεις γυμναστική η κάποια αθλητική δραστιριότητα.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weightLossRate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ρυθμός απώλειας βάρους</FormLabel>
                <FormControl>
                  <Select.Root value={field.value} onValueChange={(value) => value && field.onChange(value)}>
                    <Select.Trigger className="flex h-10 rounded-md" placeholder="π.χ: Μέτριος" />
                    <Select.Content position="popper">
                      <Select.Item value="Maintain">Διατήρηση</Select.Item>
                      <Select.Item value="Conservative">Συντηρητικός (15%)</Select.Item>
                      <Select.Item value="Moderate">Μέτριος (20%)</Select.Item>
                      <Select.Item value="Aggressive">Επιθετικός (25%)</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </FormControl>
                <FormDescription>
                  {estimatedWeeklyLoss
                    ? `~${estimatedWeeklyLoss} kg/εβδομάδα (εκτίμηση)`
                    : "Ποσοστό μείωσης θερμίδων από τις ημερήσιες ανάγκες σου."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button variant="outline" type="submit" className="w-full">
          Αποθήκευση Αλλαγών
        </Button>
      </form>
    </Form>
  );
};
