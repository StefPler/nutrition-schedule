"use client";

import { MacroForm } from "@/src/components/MacroForm";
import { useStorage } from "@/src/hooks/useStorage";
import { calcBMI, calorieMealDistribution, macroCalculator } from "@/src/services/CalculatorService";
import { UserProfile } from "@/src/types/userProfile";
import { Box, Card, Flex, Section, Separator, Text } from "@radix-ui/themes";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    getItem: { data: userProfile },
  } = useStorage<UserProfile>("userProfile");

  let macros;
  if (userProfile) {
    macros = macroCalculator(userProfile);
  }

  return (
    <Card className="flex flex-col">
      <Text align="center" size="7">
        More to come!
      </Text>
    </Card>
  );
}
