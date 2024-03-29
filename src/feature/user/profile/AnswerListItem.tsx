import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRecoilValue } from 'recoil';
import { Paragraph } from '../../../components';
import { IUserAnswer } from '../../../interface/user';
import elapsedTime from '../../../utils/elapsed-time';
import { isDarkState } from '../../../recoil';

const ItemWrapper = styled.div`
  width: 800px;
  height: 232px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 1rem;

  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 116px;
  padding: 1.25rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-300)' : 'var(--colors-brand-100)'};
  border-radius: var(--borders-radius-base);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const QuestionContentWrapper = styled.div`
  width: 100%;
  height: 50px;
  overflow: hidden;

  code {
    all: unset;
  }

  &.content {
    color: var(--colors-black-500);
  }
`;

const AnswerContent = styled.div`
  width: 100%;
  height: 28px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`;

const AnswerListItem = ({
  questionTitle,
  questionContent,
  answerContent,
  timestamp,
  likeCount,
}: Partial<IUserAnswer>) => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <ItemWrapper>
      <QuestionWrapper>
        <Paragraph
          sizeType="lg"
          fontWeight="600"
          color={isDark ? 'var(--colors-white-500)' : 'var(--colors-black-500)'}
        >
          {questionTitle}
        </Paragraph>
        <QuestionContentWrapper>
          <ReactMarkdown className="markdown content" remarkPlugins={[remarkGfm]}>
            {questionContent as string}
          </ReactMarkdown>
        </QuestionContentWrapper>
      </QuestionWrapper>

      <AnswerContent>{answerContent}</AnswerContent>
      <InfoWrapper>
        <Paragraph sizeType="sm">
          {elapsedTime(timestamp!)} • 좋아요 {likeCount}
        </Paragraph>
      </InfoWrapper>
    </ItemWrapper>
  );
};

export default AnswerListItem;
