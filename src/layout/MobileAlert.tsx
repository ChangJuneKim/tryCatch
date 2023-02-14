import styled, { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ReactComponent as LogoLightTheme } from '../assets/horizontal_logo_light_theme.svg';
import { SubTitle } from '../components';
import { darkTheme, lightTheme } from '../styles/theme';
import { isDarkState } from '../recoil';
import AnimationLoader from '../components/animation/AnimationLoader';
import animationData from '../assets/lottie/cat-ch-404.json';

const Main = styled.main`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  z-index: 1;
`;

const Backdrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: #000;
  opacity: 0.2;
`;

const Span = styled.span`
  font-size: 3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H3 = styled.h3`
  color: ${({ theme: { isDark } }) => {
    return isDark ? 'var(--colors-white-300)' : 'var(--colors-black-400)';
  }};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const MobileAlert = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Main>
        <Backdrop />
        <AnimationLoader animationData={animationData} autoplay loop />
        <Header>
          <LogoLightTheme />
        </Header>
        <SubTitle margin="2rem 0">죄송합니다.</SubTitle>
        <H3>
          모바일 뷰는 준비 중이에요.😥
          <br />
          트라이캐치는 아직 데스크탑뷰만 지원해요.
        </H3>
      </Main>
    </ThemeProvider>
  );
};

export default MobileAlert;
