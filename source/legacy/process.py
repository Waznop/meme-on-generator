from imgpy import Img
from glob import glob

with Img(fp='test.gif') as im:
    im.crop(box=(10, 10, 110, 110))
    im.save(fp='crop.gif')