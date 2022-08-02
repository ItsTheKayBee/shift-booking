const items = ['My Shifts', 'Available Shifts']

const TabBar = ({ selected, updateSelected }) => (
	<div>
		{items.map((item, index) => (
			<h3 key={index} onClick={() => updateSelected(index)}>
				{item}
			</h3>
		))}
	</div>
)

export default TabBar
