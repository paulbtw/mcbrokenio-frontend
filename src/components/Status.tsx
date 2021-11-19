import React from 'react';
import { Flex, Text, Badge, Box } from '@chakra-ui/react';
import { Availability } from '../types/types';

interface BadgeProps {
  name: string;
  hasItem: Availability;
}

export const Status: React.FC<BadgeProps> = ({ name, hasItem }) => {
  if (hasItem === Availability.NOT_APPLICABLE) return null;
  const hasItemRender = (active: Availability) => {
    if (active === Availability.AVAILABLE) {
      return <Badge colorScheme="green">Available</Badge>;
    }
    if (active === Availability.NOT_AVAILABLE) {
      return <Badge colorScheme="red">Unavailable</Badge>;
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
