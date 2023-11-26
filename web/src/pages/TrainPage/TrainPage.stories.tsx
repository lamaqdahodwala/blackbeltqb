import type { Meta, StoryObj } from '@storybook/react'

import TrainPage from './TrainPage'

const meta: Meta<typeof TrainPage> = {
  component: TrainPage,
}

export default meta

type Story = StoryObj<typeof TrainPage>

export const Primary: Story = {}
