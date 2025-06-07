"use client";
import {
  Flex,
  Badge,
  Box,
  Card,
  Inset,
  ScrollArea,
  SegmentedControl,
  Separator,
  Text,
  Strong,
  Skeleton,
  Heading,
} from "@radix-ui/themes";
import { useState } from "react";

export const RecipeCard = ({
  isLoading,
  meal,
  name,
  description,
  badges,
  ingredients,
  execution,
}: {
  isLoading: boolean;
  meal: string;
  name: string;
  description: string;
  badges: string[];
  ingredients: string[];
  execution: string[];
}) => {
  const [activeTab, setActiveTab] = useState("ingr");

  const handleActiveTabChange = (event: any) => {
    setActiveTab(event);
  };
  return (
    <Box width="380px">
      <Skeleton loading={isLoading}>
        <Heading size="8" color="cyan" className="mb-2 text-center">
          {meal}
        </Heading>
      </Skeleton>
      <Card size="2" className="shadow-lg">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        {!isLoading && !name && (
          <Text size="4" align="center" className="mt-2">
            Δεν βρέθηκε συνταγή για το {meal.toLocaleLowerCase()}
          </Text>
        )}
        <Skeleton
          loading={isLoading}
          width="300px"
          className="mb-2"
          height="20px">
          <Text size="4" align="center" weight="bold" className="mt-2">
            {name}
          </Text>
        </Skeleton>
        <Skeleton loading={isLoading} width="350px" height="60px">
          <ScrollArea
            className=""
            scrollbars="vertical"
            type="auto"
            style={{ height: 50 }}>
            <Text as="p" size="3">
              {description}
            </Text>
          </ScrollArea>
        </Skeleton>
        <Box className="flex-row">
          <Skeleton loading={isLoading}>
            {badges?.map((badge, idx) => (
              <Badge className="mt-4" key={idx}>
                {badge}
              </Badge>
            ))}
          </Skeleton>
        </Box>
        <Separator orientation="horizontal" my="3" size="4"></Separator>
        <Flex justify="center" direction="column">
          <SegmentedControl.Root
            onValueChange={handleActiveTabChange}
            defaultValue="ingr"
            size="3"
            className="mb-1 shadow-lg">
            <SegmentedControl.Item value="ingr">Υλικά</SegmentedControl.Item>
            <SegmentedControl.Item value="exec">Εκτέλεση</SegmentedControl.Item>
          </SegmentedControl.Root>

          <ScrollArea
            className=""
            scrollbars="vertical"
            type="auto"
            style={{ height: 480 }}>
            <Box className=" max-w-80">
              <Skeleton
                loading={isLoading}
                width="250px"
                height="20px"
                className="pb-1 mt-1"></Skeleton>
              <Skeleton
                loading={isLoading}
                width="200px"
                height="20px"
                className=" mt-1"></Skeleton>
              <Skeleton
                loading={isLoading}
                width="160px"
                height="20px"
                className=" mt-1"></Skeleton>
              <Skeleton
                loading={isLoading}
                width="140px"
                height="20px"
                className=" mt-1"></Skeleton>
              <Skeleton
                loading={isLoading}
                width="215px"
                height="20px"
                className=" mt-1"></Skeleton>
              <Skeleton
                loading={isLoading}
                width="115px"
                height="20px"
                className=" mt-1"></Skeleton>

              {activeTab === "ingr" && (
                <ul>
                  {ingredients?.map((ingredient, idx) => (
                    <li className="py-1" key={idx}>
                      <Text
                        align="center"
                        className="p-1 text-slate-500"
                        size="3">
                        {ingredient}
                        <br />
                      </Text>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "exec" &&
                execution?.map((step, idx) => (
                  <Text align="right" className="text-slate-500" key={idx}>
                    <Strong>{idx + 1}.</Strong> {step}
                    <br />
                    <br />
                  </Text>
                ))}
            </Box>
          </ScrollArea>
        </Flex>
      </Card>
    </Box>
  );
};
