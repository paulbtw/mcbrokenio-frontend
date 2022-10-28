import { FC, PropsWithChildren } from 'react';
import { Flex, Text } from '@chakra-ui/layout';

interface IProps {}

export const DashboardCard: FC<PropsWithChildren<IProps>> = ({ children }) => {
  return (
    <Flex
      wrap="wrap"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Text textAlign="center" fontWeight={700} fontSize="2xl">
        {children}
      </Text>
    </Flex>
  );
};
