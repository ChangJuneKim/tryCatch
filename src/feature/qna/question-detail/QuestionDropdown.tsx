import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dropdown, DropLi, DropLiContainer, DropUl } from '../../../layout/header/MemberNavMenu';
import { IconDelete, IconMore, IconPen, IconShare } from '../../../components/icons/Icons';
import useIsMe from '../../../hooks/useIsMe';
import { toastState } from '../../../recoil';
import QuestionReportModal from './QuestionReportModal';
import QuestionDeleteModal from './QuestionDeleteModal';
import isMobileState from '../../../recoil/isMobileState';

const DropContainer = styled(DropLiContainer)`
  padding: 0;
  min-width: 120px;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgb(46, 52, 64)' : 'var(--colors-brand-100)'};
  text-align: left;
  translate: 0;
  border: none;
  display: none;

  &.active {
    display: block;
  }
`;

const DropList = styled(DropLi)`
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-200)'};
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

// const ModalBody = styled.div`
//   display: flex;
//   padding: 0 2rem;
//   flex-direction: column;
//   h3 {
//     margin-bottom: 0.5rem;
//   }
//
//   p {
//     margin-bottom: 1rem;
//   }
//   .question__button-wrapper {
//     display: flex;
//     justify-content: flex-end;
//     button:first-child {
//       margin-right: 0.5rem;
//     }
//   }
// `;

const QuestionDropdown = ({
  questionId,
  userId,
  answerCount,
  isSolved,
}: {
  questionId: number;
  userId: number;
  answerCount: number;
  isSolved: boolean;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const isMe = useIsMe(userId);
  const isMobile = useRecoilValue(isMobileState);
  const setToast = useSetRecoilState(toastState);
  const navigate = useNavigate();

  const onClickModify = () => {
    if (isSolved) {
      setToast({ type: 'negative', message: '해결된 질문은 수정할 수 없어요', isVisible: true });
      return;
    }
    navigate(`/question/form/${questionId}`);
  };

  const onClickCopy = async () => {
    setDropdownIsOpen(false);
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast({ type: 'positive', message: '클립보드에 링크가 복사됐어요', isVisible: true });
    } catch (e) {
      setToast({ type: 'negative', message: '복사 실패', isVisible: true });
    }
  };

  const onClickOpenDropDown = () => {
    if (isMobile) {
      return;
    }
    setDropdownIsOpen((prev) => !prev);
  };
  return (
    <Dropdown>
      <IconMore size="18" color="var(--colors-brand-500)" onClick={onClickOpenDropDown} />
      <DropContainer className={dropdownIsOpen ? 'active' : ''}>
        <DropUl>
          {isMe && !isSolved && (
            <>
              <DropList onClick={onClickModify}>
                <IconPen />
                수정
              </DropList>
              <DropList onClick={() => setIsDeleteModalOpen(true)}>
                <IconDelete />
                삭제
              </DropList>
            </>
          )}
          <DropList onClick={onClickCopy}>
            <IconShare />
            공유하기
          </DropList>
          {/* {isMe || ( */}
          {/*  <DropList onClick={() => setIsReportModalOpen(true)}> */}
          {/*    <IconReport color="tomato" /> */}
          {/*    신고하기 */}
          {/*  </DropList> */}
          {/* )} */}
        </DropUl>
      </DropContainer>
      {/* 삭제 모달  */}
      {isDeleteModalOpen && (
        <QuestionDeleteModal
          questionId={questionId}
          answerCount={answerCount}
          setToast={setToast}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
      {/* 신고 모달  */}
      {isReportModalOpen && (
        <QuestionReportModal
          id={questionId}
          setToast={setToast}
          setIsReportModalOpen={setIsReportModalOpen}
        />
      )}
    </Dropdown>
  );
};

export default QuestionDropdown;
