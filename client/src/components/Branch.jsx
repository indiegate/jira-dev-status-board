import React from 'react';
import BranchIcon from './icons/BranchIcon';
import PrStatus from './PrStatus';
import DeletedBranchIcon from './icons/DeletedBranchIcon';

const Branch = ({ branchRepository, columnsMax }) =>
  <tr>
    <td width="25%">{branchRepository.branchName}</td>
    {branchRepository.repositories.map((rep, idx) =>
      <td key={idx}>
        {rep.branch
          ? rep.branch.deleted ? <DeletedBranchIcon/> : <BranchIcon branch={rep.branch}/>
          : null
        }
        {rep.pullRequests.map((pr, idx) => <PrStatus pullRequest={pr} key={idx}/>)}
      </td>)
    }
    {
      // hack to show full row border
      [...Array((columnsMax - branchRepository.repositories.length))].map((e, idx) => <td key={idx}/>)
    }
  </tr>;

Branch.propTypes = {
  branchRepository: React.PropTypes.object.isRequired,
};

export default Branch;