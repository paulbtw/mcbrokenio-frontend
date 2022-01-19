import { FC } from 'react';
import { Flex, Skeleton, Text } from '@chakra-ui/react';

interface IProps {
  label: string;
  value: number | undefined;
  total: number | undefined;
}

export const DashboardStatsCard: FC<IProps> = ({ label, value, total }) => {
  return (
    <Flex
      wrap="wrap"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Text textAlign="center" fontWeight={500} fontSize="xl">
        {label}
      </Text>
      {value == null && total == null ? (
        <>
          <Skeleton height="24px" width="75%" my="6px" />
        </>
      ) : (
        <>
          <Text
            textAlign="center"
            fontWeight={700}
            fontSize="2xl"
          >{`${value} / ${total}`}</Text>
        </>
      )}
    </Flex>
  );
};
