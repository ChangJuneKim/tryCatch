import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components';
import { isDarkState } from '../../recoil';

interface ISearchValue {
  data: string;
}

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.625rem;
  transform: translateY(-50%);
`;

const StyledSearchBar = styled.div`
  /* width: 36.25rem; */
  width: 36.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border-width: 0.0625rem;
  border-color: ${({ theme: { borderColor } }) => borderColor};
  position: relative;
  margin: 0 auto 0 0;
`;

const StyledSearch = styled.div`
  display: flex;
  width: 41.25rem;
`;

const QnaSearchBar = () => {
  const isDark = useRecoilValue(isDarkState);
  const { register, handleSubmit, resetField } = useForm<ISearchValue>();

  const handleClick = () => resetField('data');
  const onSubmit = handleSubmit(() => {});
  const { name, ref } = register('data');

  return (
    <form onSubmit={onSubmit}>
      <StyledSearch>
        <StyledSearchBar>
          <SearchIcon>
            <IoMdSearch
              color={isDark ? 'var(--colors-black-100)' : 'var(--colors-white-100)'}
              size="20"
            />
          </SearchIcon>
          <Input
            width="34.25rem"
            height="2.375rem"
            borderRadius="0.375rem"
            border="none"
            placeholder="Search..."
            style={{ position: 'absolute', left: '1.875rem' }}
            name={name}
            ref={ref}
          />
        </StyledSearchBar>
        <Button
          fontSize="var(--fonts-mobile-heading-lg)"
          onClick={handleClick}
          padding="0.25rem 1.125rem"
        >
          검색
        </Button>
      </StyledSearch>
    </form>
  );
};

export default QnaSearchBar;