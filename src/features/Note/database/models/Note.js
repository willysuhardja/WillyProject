import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Note extends Model {
  static table = 'notes';

  @field('title') title;
  @field('notes') notes;
  @field('timestamp') timestamp;
}
