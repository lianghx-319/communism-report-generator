import { compact, trim } from 'lodash';
import { TextNode, Sentence, Paragraph, Word } from 'nlcst-types';
import u from 'unist-builder';

export const 正面短语 = {
  推进工作: 认真学习`
    以求真务实的态度，积极推进{{正面工作}}制度化。
    以为领导决策服务为目的，积极推进{{正面工作}}正常化。
    以体现水平为责任，积极推进{{正面工作}}工作程序化。
    以畅通安全为保障，积极推进{{正面工作}}工作智能化。  
    以立此存照为借鉴，积极推进{{正面工作}}工作规范化。
    以解决问题为重点，积极推进{{正面工作}}工作有序化。
    以服务机关为宗旨，积极推进{{正面工作}}服务优质化。
    以统筹兼顾为重点，积极推进{{正面工作}}工作常态化。
    `,
  赞美传扬: 认真学习`
    遏制假恶丑，崇尚真善美和{{正面工作}}，激发积极向上的正能量。
  `,
};

export const 负面短语 = {
  大力抨击: 认真学习`
    对于{{负面工作}}，社会舆论一片哗然。
    这段时间以来，各种关于{{负面工作}}的奇怪论调纷纷出笼。
    这种论调忽略了一个基本事实，即{{正面工作}}才是根本。
    倘若无视{{正面工作}}，便只是毫无根据地谴责别人。
    这种自我预期，一旦在现实面前破灭，就抛出“{{负面工作}}”来博取同情，试图谋求法律之外的“解决”。
    但也有个别人，总觉得这背后有“深意”。
    一些人不反思道德之失、行为之垢，不正视公序良俗、法律规定，反要倒打一耙，说什么“{{负面工作}}”，如此罔顾事实，实在令人震叹。
    更有甚者，公开为丑恶现象张目，说什么“{{负面工作}}”。
    {{负面工作}}这种是非不分、黑白颠倒的谬论，自然受到网民们的痛斥。
    桥归桥路归路，一码归一码，非要把{{负面工作}}与{{正面工作}}划上等号，恰恰折射出少数人对言论自由的认识误区。
    在捕风捉影的想象中，一起普通治安事件，竟与“{{负面工作}}”挂起钩来。
    一些网络大 V 从事{{负面工作}}，被当场抓了个现形。
    兜来转去，醉翁之意，还在于划出法外之地、留出法外特权，追求既虚妄又有害的“{{负面工作}}”。
  `,
};

export const 中立内容 = {
  句首: 认真学习`
    众所周知，
    毋庸讳言，
    作为一个基本常识，
    只能说明，
    无论观点如何多元，总会有一些基本共识，
  `,
};

/** 通过认真领会精神，把一个包含学习资料的字符串变为 UNIST（此处为 NLCST）节点，并保留待填入具体内容的槽，成为一个模板 CST */
function 认真学习(共产中文模板: TemplateStringsArray): Sentence {
  // 取出字符串内容，并去掉空行和空白
  const lines = compact(compact(共产中文模板[0].split('\n')).map((line) => trim(line)));
  const unistWordNodes: Word[] = lines.map((line) => {
    // 把模板变成 UNIST 节点
    const leafTemplateFragmentNodes = line.split(/({{正面工作}}|{{负面工作}})/g).map((value) => ({
      type: 'TextNode',
      value,
      // 如果是{{正面工作}}这样的节点，则标注为待填的槽（slot 是我们自定义的元信息），等待之后替换为具体内容
      slot: value === '{{正面工作}}' || value === '{{负面工作}}' ? value : undefined,
    }));
    return { type: 'WordNode', children: leafTemplateFragmentNodes };
  });
  const sentenceUnistNode = u('SentenceNode', {children: unistWordNodes });
  return sentenceUnistNode;
}
