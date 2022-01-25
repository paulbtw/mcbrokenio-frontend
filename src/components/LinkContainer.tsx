import { FC } from 'react';
import { LinkBox, LinkOverlay, useColorModeValue } from '@chakra-ui/react';
import { DashboardCard } from './DashboardCard';

interface IProps {
  url: string;
}

export const LinkContainer: FC<IProps> = ({ children, url }) => {
  return (
    <LinkBox
      w="100%"
      h="100%"
      transition=".3s background-color ease-in-out"
      _hover={{
        bg: useColorModeValue('gray.300', 'gray.600'),
      }}
    >
      <LinkOverlay href={url} isExternal={true}>
        <DashboardCard>{children}</DashboardCard>
      </LinkOverlay>
    </LinkBox>
  );
};
