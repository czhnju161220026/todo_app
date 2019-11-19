from django.db import models


# Create your models here.

class ToDo(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=200)
    pub_date = models.DateField(verbose_name='date published')
    isDone = models.BooleanField(default=False)

    def __str__(self):
        return 'Todo item{}:{}'.format(self.id, self.title[:20])

