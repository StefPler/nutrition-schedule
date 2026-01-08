import { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { UserProfile as UserProfileT } from "../types/userProfile";
import { macroCalculator } from "../services/CalculatorService";
import { Box, Card, Flex, Separator, Text } from "@radix-ui/themes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MacroForm } from "./MacroForm";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    getItem: { data: userProfile },
  } = useStorage<UserProfileT>("userProfile");

  let macros;
  if (userProfile) {
    macros = macroCalculator(userProfile);
  }

  return (
    <Card>
      <Collapsible className="" onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
        <CollapsibleTrigger className="w-full">
          <Flex justify="between" p="2">
            <Box className="flex flex-col space-y-2">
              <Text align="left" size={"4"} weight="bold" className="text-slate-600">
                Ημερήσιοι Διατροφικοί Στόχοι
              </Text>
              {!macros && (
                <Text className="">Παρακαλώ συμπληρώστε το προφίλ σας για να δείτε τους διατροφικούς στόχους.</Text>
              )}
              {macros && (
                <Flex align="start" className="md:space-x-6 flex-col md:flex-row">
                  <Box className="space-x-1">
                    <Text weight="medium">{macros.dailyCalories}</Text>
                    <Text weight="medium">Cal</Text>
                  </Box>
                  <Box className="space-x-1">
                    <Text>{macros.protein}g</Text>
                    <Text weight="light">πρωτεΐνη</Text>
                  </Box>
                  <Box className="space-x-1">
                    <Text>{macros.fat}g</Text>
                    <Text weight="light">λιπαρά</Text>
                  </Box>
                  <Box className="space-x-1">
                    <Text>{macros.carbs}g</Text>
                    <Text weight="light">υδατάνθρακα</Text>
                  </Box>
                  <Box className="space-x-1">
                    <Text>{macros.fiber}g</Text>
                    <Text weight="light">εδώδιμες ίνες</Text>
                  </Box>
                </Flex>
              )}
            </Box>
            <Box className="self-center flex flex-row space-x-1">
              <Text weight="medium" color="cyan">
                Ενημέρωση Προφίλ
              </Text>
              {isOpen ? <ChevronUp color="green" /> : <ChevronDown color="green" />}
            </Box>
          </Flex>
        </CollapsibleTrigger>
        <CollapsibleContent className="">
          <Separator className="mb-2" size="4" />
          <MacroForm updateCallback={() => setIsOpen(false)} />
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
