import styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import React from 'react';
import { IconBellFill, IconBookmarkFill, IconUserCircle } from '../../components/icons/Icons';
import { BOOKMARK_PAGE_NAME } from '../../constant';
import { Paragraph } from '../../components';
import { accToken, isDarkState } from '../../recoil';
import { getImage, getName } from '../../apis/auth/auth';
import { Ul } from './NavMenu';

const Alert = styled.div``;

const Bookmark = styled(NavLink)``;

const ProfileLi = styled.li`
  display: flex;
  align-items: center;
  height: var(--toolbar-height);
  cursor: pointer;
  svg {
    margin-right: 0.6rem;
  }
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin-right: 0.8rem;

  & > * {
    height: var(--toolbar-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ProfileWrapper = styled.span`
  display: flex;
`;

const DropLi = styled.li`
  list-style: none;
`;

const DropUl = styled.ul`
  list-style: none;
  line-height: 1.5rem;
`;

const Dropdown = styled.button`
  border: none;
  outline: none;
  position: relative;
`;

const DropLiContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--borders-radius-base);
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 4px;
  padding: 1rem;
  position: absolute;
  display: none;

  ${Dropdown}:active & {
    display: block;
  }
  ${Dropdown}:focus & {
    display: block;
  }
`;

const MemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);
  const acc = useRecoilValue(accToken);
  const { data: profileImage } = useQuery(['user', 'profileImage'] as const, () => getImage(acc));
  const { data: userName } = useQuery(['user', 'userName'] as const, getName, {
    enabled: !!profileImage,
  });

  const navi = useNavigate();
  const goToProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    navi(`/profile/${userName}`);
  };

  return (
    <Ul>
      <Li>
        <Alert>
          <IconBellFill
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            size="20"
          />
        </Alert>
      </Li>

      <Li>
        <Bookmark to={`/${BOOKMARK_PAGE_NAME}`}>
          <IconBookmarkFill
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            size="24"
          />
        </Bookmark>
      </Li>
      <ProfileLi>
        <Dropdown>
          <ProfileWrapper>
            {profileImage ? (
              <Img src={profileImage} />
            ) : (
              <IconUserCircle
                color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                size="24"
              />
            )}
            <Paragraph
              as="span"
              sizeType="base"
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            >
              {userName}
            </Paragraph>
          </ProfileWrapper>
          <DropLiContainer>
            <DropUl>
              <DropLi as="div" onClick={goToProfile}>
                내 프로필
              </DropLi>
              {/* <DropLi as={Link} to="/settings"> */}
              <DropLi as="div" onClick={goToProfile}>
                설정
              </DropLi>
              <hr />
              <DropLi>로그아웃</DropLi>
            </DropUl>
          </DropLiContainer>
        </Dropdown>
      </ProfileLi>
    </Ul>
  );
};

export default MemberNavMenu;
