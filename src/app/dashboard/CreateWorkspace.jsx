import React from 'react'
import { connect } from 'react-redux';
import { workspacesOperations } from './duck'

const CreateWorkspace = ({ dispatch }) => {
    let input

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(workspacesOperations.addWorkspace(input.value))
                    // addWorkspace(input.value)
                        input.value = ''
                    }}
                >
                <input ref={node => input = node} />
                <button type="submit">
                    Create workspace
                </button>
            </form>
        </div>
    )
}

export default connect()(CreateWorkspace)