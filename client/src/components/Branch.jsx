import React from 'react';
import BranchIcon from './icons/BranchIcon';
import PrStatus from './PrStatus';
import DeletedBranchIcon from './icons/DeletedBranchIcon';

//import styles from './Branch.css';

const Branch = ({ branchCombined }) =>
  <div>
    {/*<span>{branchCombined.branchName}</span>*/}
    <span>
      {
        branchCombined.branches
          ? branchCombined.branches.map((b, idx) => <BranchIcon key={idx}/>)
          : <DeletedBranchIcon/>
      }
    </span>
    <span>
      {
        branchCombined.pullRequests
          ? branchCombined.pullRequests.map((pr, idx) => <PrStatus status={pr.status} key={idx}/>)
          : null
      }
    </span>
  </div>;


Branch.propTypes = {
  branchCombined: React.PropTypes.any.isRequired,
};

export default Branch;