import { FC } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react';

interface IProps {}

export const InfoCard: FC<IProps> = () => {
  const { toggleColorMode } = useColorMode();
  const ButtonIcon = useColorModeValue(MoonIcon, SunIcon);
  return (
    <Flex
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Flex
        flexBasis="50%"
        height="50%"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          onClick={toggleColorMode}
          leftIcon={<ButtonIcon />}
          size="sm"
          w="85%"
        >
          {useColorModeValue('Darkmode', 'Lightmode')}
        </Button>
      </Flex>
      <Flex
        flexBasis="50%"
        height="50%"
        alignItems="center"
        justifyContent="center"
      >
        <Button size="sm" w="85%">
          Coming soon
        </Button>
      </Flex>
      <Flex
        flexBasis="50%"
        height="50%"
        alignItems="center"
        justifyContent="center"
      >
        <Button size="sm" w="85%">
          Coming soon
        </Button>
      </Flex>
      <Flex
        flexBasis="50%"
        height="50%"
        alignItems="center"
        justifyContent="center"
      >
        <Button size="sm" w="85%">
          Coming soon
        </Button>
      </Flex>
    </Flex>
  );
};
