import React, { Component } from 'react';

import './Main.css';

import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Main extends Component {

	render() {
		return (
			<div className="root">
				<div className="container-fluid ">
					<div className="row flex-row flex-nowrap ">
						{ this.props.tasks.map((task, key) => {
							return (
								/* Task */
								<Grid key={key} item md={3}>
									<Card className={task.checked === "true" ? "card completed" : "card uncompleted"}>
										<CardContent>
											<Typography variant="body2" color="textSecondary" gutterBottom>
												{ task.group }
											</Typography>
											<Typography variant="h5" component="h2" className="mb-1">
												{ task.title }
											</Typography>
											<Typography variant="body2" color="textSecondary" gutterBottom>
												Done by { task.date }
											</Typography>
											<Typography variant="body2" component="p" className="mb-3">
												{ task.description }
											</Typography>

											<div>
												{ task.subtasks.map((subtask) => {
													return (
														/* Subtask */
														<Accordion className={subtask.checked === "true" ? "completed" : "uncompleted"}>
															<AccordionSummary
																expandIcon={<ExpandMoreIcon />}
																aria-label="Expand"
																aria-controls="additional-actions1-content"
																id="additional-actions1-header"
																>
																<FormControlLabel
																	aria-label="Acknowledge"
																	checked={ subtask.checked === "true" ? true : false }
																	onClick={(event) => event.stopPropagation()}
																	onFocus={(event) => event.stopPropagation()}
																	onChange={ this.props.checkSubtask.bind(this, task.id, subtask.id) }
																	control={<Checkbox/>}
																	label={ subtask.title }
																/>
															</AccordionSummary>
															<AccordionDetails>
																<Typography color="textSecondary">
																	{ subtask.description }
																</Typography>
															</AccordionDetails>
														</Accordion>
													)
												})}
											</div>
										</CardContent>
										<CardActions>
											<Button size="small" onClick={this.props.openAddSubtask.bind(this, task.id)}>ADD SUBTASK</Button>
											<Dialog open={this.props.addingSubtask} onClose={this.props.closeAddSubtask.bind(this, false)} aria-labelledby="form-dialog-title">
												<DialogTitle id="form-dialog-title">Create new subtask</DialogTitle>
												<DialogContent>
													<DialogContentText>
														Add a new subtask
													</DialogContentText>
													<TextField autoFocus color="secondary" margin="dense" id="subtaskTitleInput" label="Title" type="text" fullWidth onChange={this.props.subtaskTitleInputChange}/>
													<TextField autoFocus color="secondary" margin="dense" id="subtaskDescriptionInput" label="Description" type="text" fullWidth onChange={this.props.subtaskDescriptionInputChange}/>
												</DialogContent>
												<DialogActions>
													<Button onClick={this.props.closeAddSubtask.bind(this, false)} color="secondary">
														Cancel
													</Button>
													<Button onClick={this.props.closeAddSubtask.bind(this, true, task.id)} color="secondary">
														Save
													</Button>
												</DialogActions>
											</Dialog>
											<Button size="small" onClick={this.props.checkTask.bind(this, task.id)}>DONE</Button>
										</CardActions>
									</Card>
								</Grid>
							)
						})}
					</div>
					<div className="fab">
						<Fab color="secondary" aria-label="add" onClick={this.props.openAddTask.bind(this)}>
							<AddIcon />
						</Fab>
						<Dialog open={this.props.addingTask} onClose={this.props.closeAddTask.bind(this, false)} aria-labelledby="form-dialog-title">
							<DialogTitle id="form-dialog-title">Create new Task</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Add a new task
								</DialogContentText>
								<TextField autoFocus color="secondary" margin="dense" id="title" label="Title" type="text" fullWidth onChange={this.props.titleInputChange}/>
								<TextField autoFocus color="secondary" margin="dense" id="description" label="Description" type="text" fullWidth onChange={this.props.descriptionInputChange}/>
								<TextField autoFocus color="secondary" margin="dense" id="group" label="Group" type="text" fullWidth onChange={this.props.groupInputChange}/>
								<TextField autoFocus color="secondary" margin="dense" id="date" label="Date YYYY-MM-DD" type="text" fullWidth onChange={this.props.dateInputChange}/>
							</DialogContent>
							<DialogActions>
								<Button onClick={this.props.closeAddTask.bind(this, false)} color="secondary">
									Cancel
								</Button>
								<Button onClick={this.props.closeAddTask.bind(this, true)} color="secondary">
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
