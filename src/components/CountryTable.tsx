import { FC } from 'react';
import { Box } from '@chakra-ui/layout';
import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ICountryStats } from '../types/types';

interface IProps {
  data: ICountryStats[] | undefined;
}

export const CountryTable: FC<IProps> = ({ data }) => {
  return (
    <Box
      overflow="auto"
      height="100%"
      css={{
        '&::-webkit-scrollbar': {
          height: '6px',
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#ccc',
          borderRadius: '12px',
        },
      }}
    >
      <Table>
        <Thead>
          <Tr>
            <Th textAlign="center" px={2} py={1}>
              Country
            </Th>
            <Th textAlign="center" px={2} py={1}>
              Trackable
            </Th>
            <Th textAlign="center" px={2} py={1}>
              Milchshakes
            </Th>
            <Th textAlign="center" px={2} py={1}>
              McFlurry
            </Th>
            <Th textAlign="center" px={2} py={1}>
              McSundae
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {!data
            ? Array.from(Array(15).keys()).map((i) => (
                <Tr key={i}>
                  <Td colSpan={5}>
                    <Skeleton height="20px" />
                  </Td>
                </Tr>
              ))
            : data.map((country) => (
                <Tr key={country.country}>
                  <Td whiteSpace="nowrap" overflow="hidden" textAlign="center">
                    {country.country}
                  </Td>
                  <Td
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textAlign="center"
                  >{`${country.trackable} / ${country.total}`}</Td>
                  <Td
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textAlign="center"
                  >{`${country.availablemilchshakes} / ${country.totalmilchshakes}`}</Td>
                  <Td
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textAlign="center"
                  >{`${country.availablemcflurrys} / ${country.totalmcflurrys}`}</Td>
                  <Td
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textAlign="center"
                  >{`${country.availablemcsundaes} / ${country.totalmcsundaes}`}</Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </Box>
  );
};
