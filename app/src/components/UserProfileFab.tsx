"use client";
import { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { UserProfile as UserProfileT } from "../types/userProfile";
import { macroCalculator } from "../services/CalculatorService";
import { Badge, Dialog, Flex, IconButton, ScrollArea, Spinner, Text } from "@radix-ui/themes";
import { X, CalculatorIcon } from "lucide-react";
import { MacroForm } from "./MacroForm";
import { BmiCard } from "./BmiCard";

export const UserProfileFab = () => {
  const [open, setOpen] = useState(false);
  const {
    getItem: { data: userProfile, isLoading },
  } = useStorage<UserProfileT>("userProfile");

  const macros = userProfile ? macroCalculator(userProfile) : undefined;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* FAB – visible only on mobile */}
      <Dialog.Trigger>
        <button
          className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all"
          aria-label="Άνοιγμα Διατροφικού Προφίλ">
          <CalculatorIcon size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="480px" className="mx-auto">
        {/* Header row */}
        <Flex justify="between" align="center" mb="4">
          <Dialog.Title className="m-0 text-lg font-semibold">Διατροφικό Προφίλ</Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost" size="2" aria-label="Κλείσιμο">
              <X size={18} />
            </IconButton>
          </Dialog.Close>
        </Flex>

        {/* Macro summary badges */}
        {isLoading && <Spinner />}
        {macros && (
          <Flex gap="2" wrap="wrap" mb="4">
            <Badge color="green" size="2">
              {macros.dailyCalories} cal
            </Badge>
            <Badge color="blue" size="2">
              {macros.protein}g πρωτεΐνη
            </Badge>
            <Badge color="purple" size="2">
              {macros.carbs}g υδατάνθρακες
            </Badge>
            <Badge color="orange" size="2">
              {macros.fat}g λιπαρά
            </Badge>
            <Badge color="cyan" size="2">
              {macros.fiber}g ίνες
            </Badge>
          </Flex>
        )}
        {!macros && !isLoading && (
          <Text size="2" className="text-slate-500 mb-4 block">
            Συμπληρώστε τα στοιχεία σας για να δείτε τους διατροφικούς σας στόχους.
          </Text>
        )}

        {/* BMI card — only shown when profile exists */}
        {userProfile && <BmiCard userProfile={userProfile} />}

        {/* Form in a scroll area so it doesn't overflow on small phones */}
        <ScrollArea style={{ maxHeight: "62vh" }} scrollbars="vertical">
          <MacroForm updateCallback={() => setOpen(false)} />
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  );
};
