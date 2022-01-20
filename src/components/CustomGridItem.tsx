import { FC } from 'react';
import { GridItem, GridItemProps, useColorModeValue } from '@chakra-ui/react';

export const CustomGridItem: FC<GridItemProps> = ({ children, ...props }) => {
  return (
    <GridItem
      bg={useColorModeValue('gray.200', 'gray.700')}
      w="100%"
      borderRadius="md"
      overflow="hidden"
      {...props}
    >
      {children}
    </GridItem>
  );
};
