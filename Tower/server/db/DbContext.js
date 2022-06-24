import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from '../models/Comment';
import { EventSchema } from '../models/Event';
import { TicketSchema } from '../models/Ticket';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Event', EventSchema);
  Comments = mongoose.model('Comment', CommentSchema)
  Tickets = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
