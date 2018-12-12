## Assessment 2:

Expected final output:
This could be a codesandbox/codepen/etc link OR a downloadable app that could run locally (include instructions either way). Either would be expected to make use of React, styled-components, some type of state management. Include tests.

The point of this is to show awareness towards:

- React fundamentals
- Writing tests
- Managing of state
- Meeting functional requirements
- Design detail
- Semantic HTML

Description:
Using the screenshot test2-dynamic-form.png as a guide, create a web page that behaves in the following specified manner.

1.
By default, the 'Adult' and 'Children' drop-down fields for rooms 2, 3, and 4 should be disabled. Upon checking the checkbox of room 2, the drop-down fields associated with room 2 should be enabled.

Adults drop-down field values: [1, 2]
Children drop-down field values: [0, 1, 2]

2.
If the user checks the 'Room 3' checkbox, Room 2 should auto-check. (See Figure B in screenshot). If the user checks the 'Room 4' checkbox, Room 2 and Room 3 should auto-check.

3.
Any room that is checked should have a selected state, whose presentation is identical to the 'Room 1' field, and it's corresponding Adults/Children drop-down fields should be enabled.

4.
Any room that is unchecked should return to the unselected state, and it's corresponding Adults/Children drop-down fields should become disabled and return to default values.

5.
If a user unchecks a room, that room plus any room after that room should return to its unselected state. (For example, if all rooms are checked, and the user unchecks room 3, then both room 3 and room 4 should be unselected, and their drop-downs set to default values and disabled.)

6.
Upon clicking 'Submit', save values, so that upon reload, all previously selected values are pre-populated.
