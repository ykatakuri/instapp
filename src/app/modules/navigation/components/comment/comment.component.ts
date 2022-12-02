import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  onComment(): void {
    console.log('Post comment');
    this.commentForm.setValue({ comment: '' });
  }

}
