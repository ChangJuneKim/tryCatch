import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import Layout from '../../layout/Layout';
import MarqueeLogoCard from './marquee-logo-wall/MarqueeLogoCard';
import LandingTitle from './landing-title/LandingTitle';
import { ReactComponent as LogoDarkTheme } from '../../assets/vertical_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/vertical_logo_light_theme.svg';
import { isDarkState } from '../../recoil';
import { QuestionPageBody } from '../qna/QnaPage';
import IntroSection from './Sections/IntroSection';
import QnASection from './Sections/QnASection';
import FeedSection from './Sections/FeedSection';
import LastSection from './Sections/LastSection';

const LandingPageBody = styled(QuestionPageBody)`
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  align-self: flex-start;
`;

const DDiv = styled.div`
  background-image: url('../../assets/logo/dangnn.png');
  width: 300px;
  height: 222px;
`;

const LandingPage = () => {
  const isDark = useRecoilValue(isDarkState);

  const { ref: myRef, inView: myElementIsVisible } = useInView();
  console.log(myElementIsVisible);

  return (
    <Layout>
      <MarqueeLogoCard />
      <DDiv />
      <LandingPageBody>
        <LogoWrapper ref={myRef}>
          {isDark && <LogoDarkTheme width="100%" height="200" />}
          {isDark || <LogoLightTheme width="100%" height="200" />}
        </LogoWrapper>
        <LandingTitle />
        <IntroSection />
        <FeedSection />
        <QnASection />
        <LastSection />
      </LandingPageBody>
    </Layout>
  );
};
export default LandingPage;
