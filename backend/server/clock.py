import gnews
from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

@sched.scheduled_job('interval', hours=1)
def timed_job():
	print('Refreshing news table.')
	print('This job is run every hour')



sched.start()