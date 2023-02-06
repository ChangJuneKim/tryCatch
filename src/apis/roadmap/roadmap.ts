import { INode, IRoadmapPost } from '../../interface/roadmap';
import { api, authApi } from '../../utils/axios-instance';

// 로드맵
export const postRoadmap = (data: IRoadmapPost) => authApi.post('/roadmap', data);

export const getRoadmapDetail = (roadmapId: string) =>
  api.get(`/roadmap/${roadmapId}`).then((res) => {
    const { author, title, tag, nodes, edges } = res.data;
    const newNodes = JSON.parse(nodes);
    newNodes.map((node: INode) => Object.assign(node, { type: 'output' }));
    const newEdges = JSON.parse(edges);

    return {
      author,
      title,
      tag,
      nodes: newNodes,
      edges: newEdges,
    };
  });

export const getRoadmapList = () => authApi.get('/roadmap/list').then((res) => res.data);
