import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Modal,
    ModalContent,
    ModalOverlay
} from '@chakra-ui/react';

interface Props {
    title: string;
    message: string;
    isError?: boolean;
    onClose: () => void;
}

export const InfoModal = ({ title, message, isError, onClose }: Props) => {
    return (
        <Modal onClose={onClose} isOpen={true} isCentered>
            <ModalOverlay/>
            <ModalContent borderRadius="8px" borderColor={isError ? 'red.200' : 'green.200'} p="0.5rem"
                          bgColor={isError ? 'red.200' : 'green.200'}>
                <Alert
                    status={isError ? 'error' : 'success'}
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                >
                    <AlertIcon boxSize="40px" mr={0}/>
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        {title}
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        {message}
                    </AlertDescription>
                    <Button
                        mt="0.5rem"
                        border="none"
                        bgColor={isError ? 'red.500' : 'green.500'}
                        onClick={onClose} type="submit"
                        colorScheme={isError ? 'red' : 'green'}
                    >
                        ZAMKNIJ
                    </Button>
                </Alert>
            </ModalContent>
        </Modal>
    )
};