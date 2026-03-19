import { useState } from "react";
import { useStorage } from "../hooks/useStorage";
import { UserProfile as UserProfileT } from "../types/userProfile";
import { macroCalculator } from "../services/CalculatorService";
import { Badge, Card, Flex, Separator, Spinner } from "@radix-ui/themes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { MacroForm } from "./MacroForm";
import { DailyProgress } from "./DailyProgress";
import { BmiCard } from "./BmiCard";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    getItem: { data: userProfile, isLoading },
  } = useStorage<UserProfileT>("userProfile");

  const macros = userProfile ? macroCalculator(userProfile) : undefined;

  return (
    <Card className="shadow-sm">
      <Collapsible onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
        <CollapsibleTrigger className="w-full text-left">
          <div className="flex items-center justify-between gap-4 p-1">
            {/* Left: avatar + title + macros */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Avatar circle */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-white" />
              </div>

              <div className="min-w-0">
                <p className="font-bold text-slate-700 text-base leading-tight">Ημερήσιοι Διατροφικοί Στόχοι</p>

                {isLoading && <Spinner />}

                {!macros && !isLoading && (
                  <p className="text-slate-400 text-sm mt-0.5">
                    Συμπληρώστε το προφίλ σας για να δείτε τους στόχους σας!
                  </p>
                )}

                {macros && (
                  <Flex gap="2" wrap="wrap" mt="1">
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
              </div>
            </div>

            {/* Right: Edit Profile link */}
            <div className="flex items-center gap-1 flex-shrink-0 text-emerald-600 hover:text-emerald-700 transition-colors">
              <span className="font-medium text-sm">Ενημέρωση Προφίλ</span>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
          {userProfile && <BmiCard userProfile={userProfile} />}
          <DailyProgress />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Separator className="my-3" size="4" />
          <MacroForm updateCallback={() => setIsOpen(false)} />
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
