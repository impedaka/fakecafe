import { Text, Container } from "@chakra-ui/react";
const Footer = () => (
  <Container justify="center" align="center" py={8}>
    <p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-current"
      ></a>
      <Text>Made with ❤️ by Alice Yu</Text>
    </p>
  </Container>
);

export default Footer;
