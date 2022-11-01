import React from 'react'
import { Card } from '@material-ui/core'
import CreateTokenComponent from './CreateTokenComponent'

const CreateToken = () => {
    return (
        <div className="body_container">
            <h1>Create Token</h1>
            <Card className="body_card_container  mt-4">
                <CreateTokenComponent />
            </Card>
        </div>
    )
}

export default CreateToken
