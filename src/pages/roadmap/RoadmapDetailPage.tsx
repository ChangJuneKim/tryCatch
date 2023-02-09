import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../components';
import { IRoadmap } from '../../interface/roadmap';
import { getRoadmapDetail } from '../../apis/roadmap/roadmap';
import { Layout } from '../../layout';
import RoadmapDetailBody from '../../feature/roadmap/RoadmapDetailBody';
import { IconArrowBack, IconLikeEmpty, IconLikeFill } from '../../components/icons/Icons';
import { postLike, cancelLike } from '../../apis/like/like';
import { isLoggedInState, toastState } from '../../recoil';

const RoadmapDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
  margin: 3rem auto;

  h2 {
    margin: 0.725rem 0 1.5rem;
  }

  & > svg {
    cursor: pointer;
    color: ${({ theme }) => theme.textColor100};
  }
`;

const Img = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const UserInfoWrapper = styled.div`
  display: flex;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem auto 1rem;
  cursor: pointer;

  svg {
    margin-right: 0.25rem;
  }
`;

const RoadmapDetailPage = () => {
  const { userName } = useParams();
  const { data: roadmapDetail, isLoading } = useQuery<IRoadmap>(
    ['roadmap', userName] as const,
    () => getRoadmapDetail(userName!)
  );

  const navi = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

  const queryClient = useQueryClient();
  const updateLike = (type: 'up' | 'down') => {
    const prevData = queryClient.getQueryData(['roadmap', `${roadmapDetail?.roadmapId}`]);

    if (prevData) {
      queryClient.setQueryData<IRoadmap>(
        ['roadmap', `${roadmapDetail?.roadmapId}`],
        (oldData: any) => {
          return {
            ...oldData,
            likeCount: type === 'up' ? roadmapDetail!.likeCount + 1 : roadmapDetail!.likeCount - 1,
            isLiked: type === 'up',
          };
        }
      );
    }

    return {
      prevData,
    };
  };

  const { mutate: like } = useMutation(
    ['like', 'up'],
    () => postLike({ id: roadmapDetail!.roadmapId, type: 'ROADMAP' }),
    {
      onMutate: () => updateLike('up'),
    }
  );
  const { mutate: cancel } = useMutation(
    ['like', 'down'],
    () => cancelLike({ id: roadmapDetail!.roadmapId, type: 'ROADMAP' }),
    {
      onMutate: () => updateLike('down'),
    }
  );

  const onClickLikeHandler = () => {
    if (!isLoggedIn) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있습니다', isVisible: true });
      return;
    }
    if (roadmapDetail?.isLiked) {
      cancel();
    } else {
      like();
    }
  };

  if (isLoading) {
    return <Paragraph sizeType="base">Loading...</Paragraph>;
  }

  return (
    <Layout>
      <RoadmapDetailWrapper>
        <IconArrowBack onClick={() => navi(-1)} size={24} />
        {/* 태그 */}
        <Button
          as="span"
          designType="purpleFill"
          fontSize="var(--fonts-body-sm)"
          padding="2.2px 10px"
          margin="2rem 0 0 0"
        >
          {roadmapDetail?.tag}
        </Button>

        <SubTitle>{roadmapDetail?.title}</SubTitle>

        <UserWrapper>
          <UserInfoWrapper>
            <Img src={roadmapDetail?.author.profileImage} />
            <div>
              <MiniTitle sizeType="xl">{roadmapDetail?.author.userName}</MiniTitle>
              <SubText sizeType="base">
                {roadmapDetail?.author.companyName || '지나가던 개발자'}
              </SubText>
            </div>
          </UserInfoWrapper>

          {/* 팔로우 버튼 */}
          {roadmapDetail?.author.isFollowed ? (
            <Button designType="blueFill" borderRadius="var(--borders-radius-lg)">
              팔로잉
            </Button>
          ) : (
            <Button borderRadius="var(--borders-radius-lg)">팔로우</Button>
          )}
        </UserWrapper>
        <RoadmapDetailBody nodes={roadmapDetail!.nodes} edges={roadmapDetail!.edges} />

        <LikeWrapper onClick={onClickLikeHandler}>
          {roadmapDetail?.isLiked ? <IconLikeFill /> : <IconLikeEmpty />}
          <Paragraph sizeType="base">{roadmapDetail!.likeCount}</Paragraph>
        </LikeWrapper>
      </RoadmapDetailWrapper>
    </Layout>
  );
};

export default RoadmapDetailPage;
