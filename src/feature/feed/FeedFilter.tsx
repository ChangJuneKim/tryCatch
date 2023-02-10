import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MiniTitle } from '../../components';
import { isLoggedInState, toastState } from '../../recoil';

interface IFeedFilterOptions {
  id: number;
  option: string;
}
interface IFeedFilterProps {
  filterOptions: Array<IFeedFilterOptions>;
  changeOption: React.Dispatch<React.SetStateAction<string>>;
}

const Item = styled.button<{ option: string }>`
  padding: 0 0.8rem;
  //transition: color, background-color 0.1s ease-in;
  border-right: 0.8px solid;
  align-items: center;
  border-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-100)' : 'var(--colors-black-100)'};

  border-right: ${({ option }) => (option === '최신순' ? 'none' : '0.8px solid')};

  &.active > h3,
  &:hover > h3 {
    color: var(--colors-brand-500);
    font-weight: 700;
  }

  & > h3 {
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-brand-100)' : 'var(--colors-black-100)'};
    font-weight: 400;
  }
`;

const FeedFilter = ({ filterOptions, changeOption }: IFeedFilterProps) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

  const [activeFilterOption, setActiveFilterOption] = useState<string | null>(
    () => filterOptions[1].option
  );

  const handleFilterOptionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as Element;
    const filterOptionName = target.getAttribute('data-name');

    // 비로그인 상태 & 나의 관심도순 일 때 안됨!
    if (!isLoggedIn && filterOptionName === '나의 관심순') {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있어요', isVisible: true });
    } else {
      setActiveFilterOption(filterOptionName);
      changeOption(`${filterOptionName}`);
    }
  };

  return (
    <>
      {filterOptions.map(({ id, option }: IFeedFilterOptions) => {
        return (
          <Item
            key={id}
            onClick={handleFilterOptionClick}
            className={activeFilterOption === option ? 'active' : ''}
            option={option}
          >
            <MiniTitle
              sizeType="xl"
              color="var(--colors-black-100)"
              data-name={option}
              style={{
                fontSize: 'var(--fonts-body-base)',
                lineHeight: 'var(--fonts-body-base)',
              }}
            >
              {option}
            </MiniTitle>
          </Item>
        );
      })}
    </>
  );
};

export default FeedFilter;
