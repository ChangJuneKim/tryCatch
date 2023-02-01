import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { IconBookmarkEmpty, IconBookmarkFill } from '../../components/icons/Icons';
import { Button, MiniTitle, Paragraph } from '../../components';
import { isDarkState } from '../../recoil';

const Wrapper = styled.article`
  display: flex;
  border-bottom: 1px solid var(--colors-black-200);
  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
  }
`;

const ArticleWrapper = styled.article`
  width: 630px;
  padding: 1rem 2rem;
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.6rem 0 0.5rem;
`;

const FeedBody = styled.div`
  margin-bottom: 0.75rem;
`;

const FeedFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TagsWrapper = styled.div`
  & > span {
    display: inline-block;
    margin-right: 0.5rem;
  }
`;

const Icons = styled.button`
  display: flex;
  align-items: center;
  svg {
    margin-left: 0.6rem;
    cursor: pointer;
  }
  z-index: 2;
`;

const FeedThumbnailImg = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 11.5rem;
  height: 7.875rem;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base);
  margin: auto 1rem;
`;
const CompanyImg = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin: auto 8px;
`;

const createImageUrl = (companyName: string) => {
  return new URL(`/src/assets/logo/${companyName}.png`, import.meta.url).href;
};

const BlogTitle = styled.span`
  display: flex;
`;

export interface IFeedListItemProps {
  feedId: string; // 피드 고유 아이디
  title: string; // 피드 제목
  summary: string; // 피드 요약 ( 300자 내외 )
  companyName: string; // 회사 이름
  createdAt: string; // 피드 생성일 yyyy-MM-dd
  url: string; // 피드 URL
  thumbnailImage: string; // 썸네일 이미지 URL
  tags: Array<string>; // 크롤링 시 수집한 태그
  keywords: Array<string>; // 인공지능 모델을 통해 추출한 태그
  isBookmarked: boolean; // 북마크 여부
}

const FeedListItem = ({
  title,
  summary,
  tags,
  isBookmarked,
  url,
  companyName,
  thumbnailImage,
}: IFeedListItemProps) => {
  const isDark = useRecoilValue(isDarkState);
  const [bookMarkIcon, setBookMarkIcon] = useState(isBookmarked);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBookMarkIcon(!bookMarkIcon);
    e.preventDefault();

    // isBookmarked 상태 변화 보내기
    // /bookmark
    // body{
    //   id: number,
    //   type :string; // feed
    // }
  };

  return (
    <a href={`${url}`} target="_blank" rel="noreferrer" style={{ zIndex: '1' }}>
      <Wrapper>
        <FeedThumbnailImg image={thumbnailImage} />
        <ArticleWrapper>
          <FeedHeader>
            <BlogTitle>
              <MiniTitle
                sizeType="xl"
                color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
                textAlign="left"
              >
                {title.length > 36 ? `${title.slice(0, 36)}...` : title}
              </MiniTitle>
              <CompanyImg
                src={
                  companyName
                    ? createImageUrl(companyName)
                    : new URL(`/src/assets/favicon.ico`, import.meta.url).href
                }
                alt={`${companyName}`}
              />
            </BlogTitle>
            <Icons onClick={handleClick}>
              {/* 북마크 */}
              {bookMarkIcon && <IconBookmarkFill size="30" color="var(--colors-brand-500)" />}
              {bookMarkIcon || <IconBookmarkEmpty size="30" color="var(--colors-brand-500)" />}
            </Icons>
          </FeedHeader>

          <FeedBody>
            <Paragraph
              sizeType="base"
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              style={{ width: '510px' }}
            >
              {summary.length > 90 ? `${summary.slice(0, 90)}...` : summary}
            </Paragraph>
          </FeedBody>

          <FeedFooter>
            <TagsWrapper>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  as="span"
                  designType="blueEmpty"
                  color="var(--colors-brand-500)"
                  fontSize="var(--fonts-body-xm)"
                  padding="2px 10px"
                  borderRadius="var(--borders-radius-base)"
                >
                  {tag}
                </Button>
              ))}
            </TagsWrapper>
          </FeedFooter>
        </ArticleWrapper>
      </Wrapper>
    </a>
  );
};

export default FeedListItem;
