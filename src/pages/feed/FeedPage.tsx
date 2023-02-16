import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { HeaderImage, Layout } from '../../layout';
import { Paragraph, SubTitle } from '../../components';
import { header_feed } from '../../assets';
import {
  CompanyRecommend,
  FeedFilter,
  FeedList,
  FeedSearchSide,
  FeedView,
} from '../../feature/feed';
import { QuestionPageBody as FeedPageBody } from '../qna/QnaPage';
import { isLoggedInState } from '../../recoil';

const Aside = styled.aside`
  margin: 0rem;
  position: sticky;
  top: 3rem;
  min-height: 500px;
  width: 20.75rem;
  padding: 3rem 1rem 4px 4px;
  overflow-y: scroll;
  max-height: 90vh;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const FilterTop = styled.section`
  display: flex;
  justify-content: right;
  margin-bottom: 1rem;
`;

const filterOptions = [
  {
    id: 1,
    option: '나의 관심순',
  },
  {
    id: 2,
    option: '최신순',
  },
];

const FeedPage = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [activeFilterOption, setActiveFilterOption] = useState(
    isLoggedIn ? '나의 관심순' : '최신순'
  );
  const [activeViewOption, setActiveViewOption] = useState<boolean>(true);
  const [tagListProps, setTagListProps] = useState<Array<string>>([]);
  const [checkedItemsProps, setCheckedItemsProps] = useState<Array<number>>([]);

  const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';
  const subscribe = checkedItemsProps.includes(1);
  const advanced = checkedItemsProps.includes(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [keyword, subscribe, advanced]);

  const getData = (data: Array<string>) => {
    setTagListProps(data);
  };

  const getCheckData = (data: Array<number>) => {
    setCheckedItemsProps(data);
  };

  return (
    <Layout>
      <HeaderImage image={header_feed}>
        <SubTitle>피드</SubTitle>
        <Paragraph sizeType="base">
          다양한 기업의 블로그를 보며 기술 트렌드를 쉽게 파악해보세요
        </Paragraph>
      </HeaderImage>
      <FeedPageBody>
        <Aside>
          <div>
            <FeedSearchSide
              tagListProps={tagListProps}
              getCheckData={getCheckData}
              keyword={keyword}
            />

            <CompanyRecommend />
          </div>
        </Aside>
        <section style={{ margin: '3rem 0 0 0' }}>
          <FilterTop>
            <FeedFilter filterOptions={filterOptions} changeOption={setActiveFilterOption} />
            <FeedView setActiveViewOption={setActiveViewOption} />
          </FilterTop>
          <FeedList
            activeViewOption={activeViewOption}
            keyword={keyword}
            subscribe={subscribe}
            advanced={advanced}
            getData={getData}
            activeFilterOption={activeFilterOption}
            tagListProps={tagListProps}
            checkedItemsProps={checkedItemsProps}
          />
        </section>
      </FeedPageBody>
    </Layout>
  );
};

export default FeedPage;
