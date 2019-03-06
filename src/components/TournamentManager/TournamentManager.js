import React, { useState } from 'react';
import groupBy from 'lodash/groupBy';
import chunk from 'lodash/chunk';
import isEqual from 'lodash/isEqual';
import Track from '../Track/Track';
import './styles.css';

function getParentNode(node, allNodes) {
  return allNodes.find(n => n.children.find(nodeId => node.nodeId === nodeId));
}

function isAncestor(child, parent, allNodes) {
  if (parent) {
    if (parent.children.includes(child.nodeId)) {
      return true;
    }
    const child1 = allNodes.find(n => n.nodeId === parent.children[0]);
    const child2 = allNodes.find(n => n.nodeId === parent.children[1]);
    if (isAncestor(child, child1, allNodes)) {
      return true;
    }
    if (isAncestor(child, child2, allNodes)) {
      return true;
    }
  }
  return false;
}

function getSibling(node, parent, allNodes) {
  const nodeIdOfSibling = parent.children.find(nodeId => node.nodeId !== nodeId);
  return allNodes.find(n => n.nodeId === nodeIdOfSibling);
}


function onWinnerSelected (winningNode, allNodes, setNodes) {
  const nodesCopy = allNodes.filter(n => n);
  
  const parentOfWinningNode = getParentNode(winningNode, nodesCopy);
  const grandpa = getParentNode(parentOfWinningNode, nodesCopy);
  const siblingOfWinningNode = getSibling(winningNode, parentOfWinningNode, nodesCopy);
  if (!siblingOfWinningNode) return null;

  const newNodes = nodesCopy.map((n) => {
    // Make sibling have "Lost" status
    if (n.nodeId === siblingOfWinningNode.nodeId) {
      return Object.assign(n, { isWinner: false });
    }
    // Flag up winning node
    if (isEqual(n, winningNode)) {
      return Object.assign({}, n, { isWinner: true });
    }

    // Update ancestors
    if (isAncestor(winningNode, n, nodesCopy)) {
      if (parentOfWinningNode && parentOfWinningNode.isWinner) {
        return Object.assign({}, n, { trackData: winningNode.trackData });
      }
    }

    // Update parent
    if (isEqual(parentOfWinningNode, n)) {
      const newNode = Object.assign({}, n, { trackData: winningNode.trackData });
      if (parentOfWinningNode && parentOfWinningNode.isWinner) {
        debugger;
        onWinnerSelected(newNode, allNodes, setNodes);
      }
      return newNode;
    }

    return n;
  });
  setNodes(newNodes);
}

export default function TournamentManager(props) {
  const { tracks } = props;
  let idCount = 0;
  const nodes = tracks.map((track, index) => {
    const newId = idCount;
    idCount += 1
    return { nodeId: `${newId}`, trackData: track, isWinner: false, round: 0, children: [null, null] };
  });

  const nodeQueue = nodes.slice();

  while (nodeQueue.length > 1) {
    let first = nodeQueue[0];
    let second = nodeQueue[1];
    let newRoot = { nodeId: `${idCount}`, trackData: null, isWinner: false, round: second.round + 1, children: [first.nodeId, second.nodeId]};
    idCount += 1;

    nodeQueue.splice(0, 2);
    nodeQueue.push(newRoot);
    nodes.push(newRoot);
  }

  const [allNodes, setNodes] = useState(nodes);

  const groupedByRound = Object.values(groupBy(allNodes, 'round'));
  return (
    groupedByRound.map((roundList, index) => {
      if (roundList.length > 1) {
        const pairs = chunk(roundList, 2);
        return <div key={index} className="round">
          {pairs.map((p, pIdx) => {
            return (
              <div key={pIdx} className="battle">
              <React.Fragment key={pIdx}>
                <div className="spacer" />
                <Track
                  isTop
                  round={index}
                  track={p[0] && p[0].trackData}
                  isWinner={p[0] && p[0].isWinner}
                  setWinner={() => { onWinnerSelected(p[0], allNodes, setNodes); }}
                />
                <span className="vs">vs</span>
                <Track
                  isTop={false}
                  round={index}
                  track={p[1] && p[1].trackData}
                  isWinner={p[1] && p[1].isWinner}
                  setWinner={() => { onWinnerSelected(p[1], allNodes, setNodes); }}
                />
                <div className="spacer" />
              </React.Fragment>
              </div>
            )
          })}
        </div>
      }
      return null;
    })
  );
}