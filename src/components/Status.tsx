import React from 'react';
import { Flex, Text, Badge, Box, Tooltip } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { Availability } from '../types/types';

interface BadgeProps {
  name: string;
  hasItem: Availability;
  brokenSince: number | null;
}

export const Status: React.FC<BadgeProps> = ({
  name,
  hasItem,
  brokenSince,
}) => {
  if (hasItem === Availability.NOT_APPLICABLE) return null;
  const hasItemRender = (active: Availability) => {
    if (active === Availability.AVAILABLE) {
      return <Badge colorScheme="green">Available</Badge>;
    }
    if (active === Availability.NOT_AVAILABLE) {
      return (
        <Tooltip
          label={
            brokenSince
              ? `for ${formatDistance(brokenSince, new Date())}`
              : undefined
          }
          placement="top"
        >
          <Badge colorScheme="red">Unavailable</Badge>
        </Tooltip>
      );
    }
    return <Badge colorScheme="gray">Unknown</Badge>;
  };

  return (
    <Flex>
      <Box flexGrow={1}>
        <Text>{name}</Text>
      </Box>
      {hasItemRender(hasItem)}
    </Flex>
  );
};
