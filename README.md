# Tech-Deck API

# Exams

-  Exams are indexed using the the `_id` key.
-  An exam is defined as a json object that contains a header

## Querying an Exam returns:

```yaml
{
  _id: String,
  examKey: String,          # Expected exam code to be able to take this test. 2FA.
  name: String,
  description: String,
  name: String,
  tags: [ ],                # Array of tags defined by the user.
  tier: Int,                # [1, 2, 3] - Indicates %competency expected to pass exam.

  questions: {
    q1: {
      type: String,         # [ "multi", "any", "short", "fillblank", "arrange" ]
      img: ImageReference,  # References an image on server to send to client as an optional image for this question.
      body: String,         # The question itself. This is what the user responds to with 'answers'.
      input: { },           # Object containing the expected input fields based on question type that user will interact with.
      answers: { }          # Object containing the expected answer based on the input field. This does not apply to short answer, but users can add extra data here if they want to.
    },
    q2: {},
    q3: {},
    q4: {},
    q5: {},
    q6: {},
    q7: {},
    q8: {},

  },
}
```

### Question Types

```yaml

```
