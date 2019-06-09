import * as React from 'react';
import { HomeContainer, Logo, Title, HowTo, Code, DescriptionLine, DescriptionList } from './Home.style';
import logo from 'assets/forge_logo.png';

const Home: React.FunctionComponent = () => (
  <HomeContainer>
    <Logo alt="forgelogo" src={logo} />
    <Title>Welcome to Forge, you’ve just launched your project</Title>
    <HowTo>
      <DescriptionList>
        <DescriptionLine>
          To create a page or a component, run <Code>yarn generate</Code>.
        </DescriptionLine>
        <DescriptionLine>
          The style is centralized in the <Code>src/stylesheet.ts</Code>. From there, you can manage colors, font properties, spacing unit...
        </DescriptionLine>
        <DescriptionLine>
          Redesign the <Code>src/components/AppCrashFallback</Code> that will display when there is a javascript error.
        </DescriptionLine>
        <DescriptionLine>
          Read more about the tools and built-in features in the <Code>README.md</Code>.
        </DescriptionLine>
      </DescriptionList>
    </HowTo>
  </HomeContainer>
);

export default Home;
